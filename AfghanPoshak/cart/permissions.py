from rest_framework import permissions


# class IsOwnerOrReadOnly(permissions.BasePermission):
#     def has_object_permission(self, request, view, obj):
#         if request.method in permissions.SAFE_METHODS:
#             return True  # Read permissions for everyone
#         return obj.user == request.user  # Write permissions only for the cart owner


from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True  # Read permissions for everyone
        return obj.user == request.user  # Write permissions only for the cart owner

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

