import graphene
from api.utils.functions import catch_errors


class CahObjectType(graphene.ObjectType):
    class Meta:
        abstract = True

    @classmethod
    def __init_subclass_with_meta__(
        cls,
        interfaces=(),
        possible_types=(),
        default_resolver=None,
        _meta=None,
        **options,
    ):

        super().__init_subclass_with_meta__(
            interfaces, possible_types, default_resolver, _meta, **options
        )

        for f in cls._meta.fields:
            field = getattr(cls, f)
            if hasattr(field, "resolver"):
                field.resolver = catch_errors(field.resolver)
