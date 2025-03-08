from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CartItem
from .serializers import CartItemSerializer
from products.models import Product
from .permissions import IsOwnerOrReadOnly 


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import CartItem


from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CartItem
from .serializers import CartItemSerializer

class CartListView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure only logged-in users can access

    def get(self, request):
        user = request.user  # Get the currently logged-in user
        cart_items = CartItem.objects.filter(user=user)  # Filter by user
        serializer = CartItemSerializer(cart_items, many=True)
        return Response(serializer.data)


class CartItemListCreateView(generics.ListCreateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class AddToCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        product_id = request.data.get("product")
        quantity = request.data.get("quantity", 1)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        cart_item, created = CartItem.objects.get_or_create(
            user=request.user, product=product, defaults={"quantity": quantity}
        )

        if not created:
            cart_item.quantity += int(quantity)
            cart_item.save()

        return Response({"message": "Product added to cart"}, status=status.HTTP_201_CREATED)



# class UpdateCartItemView(APIView):
#     permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

#     def patch(self, request, product_id):
#         quantity = request.data.get("quantity")

#         if quantity is None:
#             return Response({"error": "Quantity is required"}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             cart_item = CartItem.objects.get(user=request.user, product_id=product_id)
#         except CartItem.DoesNotExist:
#             return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)

#         if int(quantity) < 1:
#             cart_item.delete()
#             return Response({"message": "Item removed from cart"}, status=status.HTTP_200_OK)

#         cart_item.quantity = int(quantity)
#         cart_item.save()

#         return Response({"message": "Cart updated", "quantity": cart_item.quantity}, status=status.HTTP_200_OK)


# class RemoveCartItemView(APIView):
#     permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

#     def delete(self, request, product_id):
#         try:
#             cart_item = CartItem.objects.get(user=request.user, product_id=product_id)
#         except CartItem.DoesNotExist:
#             return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)

#         cart_item.delete()
#         return Response({"message": "Item removed from cart"}, status=status.HTTP_200_OK)




@csrf_exempt
def update_cart_item(request, item_id):
    if request.method == "PATCH":
        try:
            data = json.loads(request.body)
            item = CartItem.objects.get(id=item_id)
            item.quantity = data.get("quantity", item.quantity)
            item.save()
            return JsonResponse({"success": True, "quantity": item.quantity})
        except CartItem.DoesNotExist:
            return JsonResponse({"error": "Item not found"}, status=404)
    return JsonResponse({"error": "Invalid request"}, status=400)

@csrf_exempt
def remove_cart_item(request, item_id):
    if request.method == "DELETE":
        try:
            item = CartItem.objects.get(id=item_id)
            item.delete()
            return JsonResponse({"success": True})
        except CartItem.DoesNotExist:
            return JsonResponse({"error": "Item not found"}, status=404)
    return JsonResponse({"error": "Invalid request"}, status=400)


class CartSummaryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        cart_items = CartItem.objects.filter(user=request.user)
        serializer = CartItemSerializer(cart_items, many=True)
        total_price = sum(item.product.price * item.quantity for item in cart_items)
        return Response({"cart_items": serializer.data, "total_price": total_price})
