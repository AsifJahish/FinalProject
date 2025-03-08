

from django.urls import path
from .views import CartItemListCreateView, AddToCartView, CartSummaryView

from .views import update_cart_item, remove_cart_item, CartListView


urlpatterns = [
    path("cart/", CartSummaryView.as_view(), name="cart-summary"),
    # path("cart/list/", CartItemListCreateView.as_view(), name="cart-list-create"),
    path("cart/list/", CartListView.as_view(), name="cart-list-create"),
    path("cart/add/", AddToCartView.as_view(), name="cart-add"),
    # path("cart/update/<int:product_id>/", UpdateCartItemView.as_view(), name="cart-update"),
    # path("cart/remove/<int:product_id>/", RemoveCartItemView.as_view(), name="cart-remove"),



    path('cart/update/<int:item_id>/', update_cart_item, name='update_cart_item'),
    path('cart/remove/<int:item_id>/', remove_cart_item, name='remove_cart_item'),
]



#  UpdateCartItemView, RemoveCartItemView,