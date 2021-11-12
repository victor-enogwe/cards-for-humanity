from django.core.validators import MaxValueValidator, MinLengthValidator, MinValueValidator, RegexValidator

from api.utils.constants import password_error_message, text_error_message

password_regex = RegexValidator(
    r'^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$',
    password_error_message
)

password_validators = [MinLengthValidator(
    5, password_error_message), password_regex]

phone_regex = RegexValidator(
    regex=r"^\+?1?\d{9,15}$",
    message=(
        "Phone number must be entered in the format: '+999999999'. "
        "Up to 15 digits allowed."
    ),
)

text_regex_validator = RegexValidator(
    r'^[A-Za-z]([\w+|-|\s|\'|\"|\.|!]?)+',
    text_error_message
)
text_validators = [
    MinLengthValidator(5, text_error_message),
    text_regex_validator
]


def min_max_validator(min, max):
    message = 'value should be >= {0} and <= {1}'.format(min, max)
    return [MinValueValidator(min, message=message), MaxValueValidator(max, message=message)]
