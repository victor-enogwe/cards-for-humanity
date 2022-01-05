import getpass
import os
import sys
from typing import Any, Optional

from django.contrib.auth.management.commands.createsuperuser import (
    Command,
    NotRunningInTTYException,
)
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from django.core.management.base import CommandError, CommandParser
from django.db import DEFAULT_DB_ALIAS

from api.models.password import Password
from api.models.provider import Provider

PASSWORD_FIELD = "password"


class Command(Command):
    help = "Used to create a superuser."
    requires_migrations_checks = True
    stealth_options = ("stdin",)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument(
            "--email",
            help="Specifies the email for the superuser.",
        )
        parser.add_argument(
            "--noinput",
            "--no-input",
            action="store_false",
            dest="interactive",
            help=(
                "Tells Django to NOT prompt the user for input of any kind. "
                "You must use --email with --noinput, along with an option for "
                "any other required field. Superusers created with --noinput will "
                "not be able to log in until they're given a valid password."
            ),
        )
        parser.add_argument(
            "--database",
            default=DEFAULT_DB_ALIAS,
            help='Specifies the database to use. Default is "default".',
        )

    def handle(self, *args: Any, **options: Any) -> Optional[str]:
        email = options["email"]
        password_data = {PASSWORD_FIELD: None}
        database = options["database"]

        try:
            if options["interactive"]:
                if hasattr(self.stdin, "isatty") and not self.stdin.isatty():
                    raise
                if email:
                    email = Provider.normalize_email(email)
                elif email == "":
                    raise CommandError("Email cannot be blank.")
                # Prompt for username.
                while email is None:
                    email_field = Provider._meta.get_field("email")
                    message = self._get_input_message(email_field)
                    email = self.get_input_data(email_field, message)
                    if email:
                        email = Provider.normalize_email(email)
                # Prompt for a password if the model has one.
                while (
                    PASSWORD_FIELD in password_data
                    and password_data[PASSWORD_FIELD] is None
                ):
                    password = getpass.getpass()
                    password2 = getpass.getpass("Password (again): ")
                    password_model = Password(password=password)
                    validate_password(password2, password_model)
                    password_data[PASSWORD_FIELD] = password
            else:
                # Non-interactive mode.
                # Use password from environment variable, if provided.
                if "SUPERUSER_PASSWORD" in os.environ:
                    password_data[PASSWORD_FIELD] = os.environ["SUPERUSER_PASSWORD"]
                # Use username from environment variable, if not provided in
                # options.
                if email is None:
                    email = os.environ.get("SUPERUSER_EMAIL")
                if email is None:
                    raise CommandError("You must use --email with --noinput.")
                email = Provider.normalize_email(email)

            self.UserModel._default_manager.db_manager(database).create_superuser(
                email=email, password=password_data[PASSWORD_FIELD]
            )
            if options["verbosity"] >= 1:
                self.stdout.write("Superuser created successfully.")
        except KeyboardInterrupt:
            self.stderr.write("\nOperation cancelled.")
            sys.exit(1)
        except exceptions.ValidationError as e:
            raise CommandError("; ".join(e.messages))
        except NotRunningInTTYException:
            self.stdout.write(
                "Superuser creation skipped due to not running in a TTY. "
                "You can run `manage.py createsuperuser` in your project "
                "to create one manually."
            )
