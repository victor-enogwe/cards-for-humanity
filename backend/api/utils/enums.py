from inspect import getmembers, isroutine

from graphene import Enum


class EnumChoices:
    @classmethod
    def choices(self):
        attributes = getmembers(self, lambda a: not (isroutine(a)))
        values = [(a[1]._value_, a[0]) for a in attributes if hasattr(a[1], "_value_")]
        return values


class GameStatus(EnumChoices, Enum):
    GAP = "Awaiting Players"
    GS = "Game Started"
    GC = "Game Canceled"
    GACQ = "Awaiting Czar Question"
    GAPA = "Awaiting Player Answers"
    GACA = "Awaiting Czar Answers"
    GSRR = "Show Round Result"
    GRF = "Game Rounds Finished"
    GE = "Game Ended"


class Gender(EnumChoices, Enum):
    MALE = "Male"
    FEMALE = "Female"
    OTHER = "Other"


class Conversion(EnumChoices, Enum):
    INVITED = "Invited"
    CREATED = "Created"
    SUPERUSER = "Superuser"


class Provider(EnumChoices, Enum):
    TWITTER = "Twitter"
    GOOGLE = "Google"
    INSTAGRAM = "Instagram"
    FACEBOOK = "Facebook"
    EMAIL = "Email"


class Avatars(EnumChoices, Enum):
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


class EmailType(EnumChoices, Enum):
    PLAY_INVITATION = "Account Invitation"
    EMAIL_VERIFICATION = "Email Verification"
    PASSWORD_RESET = "Password Reset"


class CardRating(EnumChoices, Enum):
    BAD = "Bad"
    MEH = "Meh"
    NORMAL = "Normal"
    LIKE = "Like"
    LOVE = "Love"


class BlackCardPickChoices(EnumChoices, Enum):
    PICK_ONE = "Pick One"
    PICK_TWO = "Pick Two"
    PICK_THREE = "Pick Three"
