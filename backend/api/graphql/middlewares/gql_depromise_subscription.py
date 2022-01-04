from promise import is_thenable


class DepromiseSubscription(object):
    def resolve(self, next, root, info, **kwargs):
        result = next(root, info, **kwargs)
        if info.operation.operation == "subscription" and is_thenable(result):
            return result.get()
        return result

def depromise_subscription(next, root, info, *args, **kwargs):
        result = next(root, info, *args, **kwargs)
        if info.operation.operation == "subscription" and is_thenable(result):
            return result.get()
        return result
