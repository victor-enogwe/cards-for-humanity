from .question import Query, Mutation, Question, Answer, Schema

schema = Schema(query=Query, mutation=Mutation, types=[Question, Answer])
