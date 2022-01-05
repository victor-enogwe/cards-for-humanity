from api.utils.constants import password_error_message, text_error_message
from django.core.validators import (
    MaxValueValidator,
    MinLengthValidator,
    MinValueValidator,
    RegexValidator,
)

password_regex = RegexValidator(
    r"^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$",
    password_error_message,
)

password_validators = [password_regex]

text_regex_validator = RegexValidator(
    r"^[A-Za-z]([\w+|-|\s|\'|\"|\.|!]?)+", text_error_message
)
text_validators = [MinLengthValidator(5, text_error_message), text_regex_validator]


class RegexPasswordValidator:
    """
    Validate whether the password is alphanumeric.
    """

    def validate(self, password, user=None):
        return password_regex.__call__(password)

    def get_help_text(self):
        return password_error_message


def min_max_validator(min, max):
    message = "value should be >= {0} and <= {1}".format(min, max)
    return [
        MinValueValidator(min, message=message),
        MaxValueValidator(max, message=message),
    ]
