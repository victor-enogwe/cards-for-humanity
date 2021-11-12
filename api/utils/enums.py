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
    CREATED = 'created'


class Provider(TextChoices):
    TWITTER = 'Twitter'
    GOOGLE = 'Google'
    INSTAGRAM = 'Instagram'
    FACEBOOK = 'Facebook'
    CAH = 'Cah'


class PasswordErrors:
    PASSWORD_SAME = "PASSWORD_SAME"
    PASSWORD_WEAK = "PASSWORD_WEAK"
