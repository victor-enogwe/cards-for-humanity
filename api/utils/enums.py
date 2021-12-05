from django.db.models import TextChoices


class GameStatus(TextChoices):
    GAP = "Awaiting Players"
    GS = "Game Started"
    GC = "Game Canceled"
    GAC = "Awaiting Czar"
    GAA = "Awaiting Answers"
    GE = "Game Ended"


class Gender(TextChoices):
    MALE = "Male"
    FEMALE = "Female"
    OTHER = "Other"


class Conversion(TextChoices):
    INVITED = "Invited"
    CREATED = "Created"
    SUPERUSER = "Superuser"


class Provider(TextChoices):
    TWITTER = "Twitter"
    GOOGLE = "Google"
    INSTAGRAM = "Instagram"
    FACEBOOK = "Facebook"
    EMAIL = "Email"


class Avatars(TextChoices):
    ABBY = "abby"
    ALFRED = "alfred"
    ANDINA = "andina"
    ASTRO = "astro"
    CAMILE = "camile"
    DOROTHY = "dorothy"
    DUDAI = "dudai"
    EDUARDO = "eduardo"
    GENERAL = "general"
    GRACE = "grace"
    IRANIR = "iranir"
    JENNIFER = "jennifer"
    LABRAT = "labrat"
    LUTHER = "luther"
    RAINBOWNESS = "rainbowness"
    SHIN = "shin"


class EmailType(TextChoices):
    PLAY_INVITATION = "Account Invitation"
    EMAIL_VERIFICATION = "Email Verification"
    PASSWORD_RESET = "Password Reset"


class CardRating(TextChoices):
    NORMAL = "Normal"
