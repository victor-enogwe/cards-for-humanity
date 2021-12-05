from django.utils.translation import gettext_lazy as _

auth_fields = [
    "genres",
    "game",
    "whiteCards",
    "blackCards",
    "whoami",
    "users",
    "createGame",
    "joinGame",
]

password_error_message = _(
    "password must have a minimum of 8 characters\n"
    "password must have a maximum of 30 characters\n"
    "password must have an uppercase character\n"
    "password must have a lowercase character\n"
    "password must have a numeric character\n"
    "password must have a special characters",
)


password_allowed_chars = _(
    "abcdefghjkmnpqrstuvwxyz" "ABCDEFGHJKLMNPQRSTUVWXYZ" "23456789"
)


text_error_message = _("text allows 2-255 characters(alphabets and -,_,.,',\",space)")

username_help_text = _(
    "Required. 40 characters or fewer. Letters, digits and @/./+/-/_ only."
)

username_unique_error_message = _("A user with that username already exists.")

old_password_error_message = _("You've tried to login with an old password")

bulk_create_args = {"batch_size": 100, "ignore_conflicts": True}
