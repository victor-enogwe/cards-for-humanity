from django_filters import FilterSet, CharFilter


class SearchFilter(FilterSet):
    # Do case-insensitive lookups on 'name'
    name = CharFilter(lookup_expr=['iexact'])

    class Meta:
        model = Animal
        fields = ['name', 'genus', 'is_domesticated']
