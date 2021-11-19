from django.db.models import TextChoices


class GameStatus(TextChoices):
    GAP = 'Awaiting Players'
    GAC = 'Awaiting Czar'
    GS = 'Game Started'
    GE = 'Game Ended'


class Gender(TextChoices):
    MALE = 'Male'
    FEMALE = 'Female'
    OTHER = 'Other'


class Conversion(TextChoices):
    INVITED = 'Invited'
    CREATED = 'Created'
    SUPERUSER = 'Superuser'


class Provider(TextChoices):
    TWITTER = 'Twitter'
    GOOGLE = 'Google'
    INSTAGRAM = 'Instagram'
    FACEBOOK = 'Facebook'
    EMAIL = 'Email'


class EmailType(TextChoices):
    PLAY_INVITATION = 'Account Invitation'
    EMAIL_VERIFICATION = 'Email Verification'
    PASSWORD_RESET = 'Password Reset'


class CardRating(TextChoices):
    NORMAL = 'Normal'
