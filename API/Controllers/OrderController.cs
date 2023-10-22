using Application.Dto.Order;
using Application.Interfaces;
using Domain.Enums;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class OrderController : BaseApiController
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("orders")] //api/orders
        public async Task<IActionResult> CreateOrder(OrderCreateUpdateDto order)
        {
            return HandleResult(await _orderService.Create(order));
        }

        [HttpGet("orders/{orderId}")] //api/orders/orderId
        public async Task<IActionResult> GetOrderDetails(int orderId)
        {
            return HandleResult(await _orderService.Details(orderId));
        }

        [HttpPut("orders/{orderId}")] //api/orders/orderId
        public async Task<IActionResult> UpdateOrder(int orderId, OrderCreateUpdateDto order)
        {
            return HandleResult(await _orderService.Update(orderId, order));
        }

        [HttpPost("orders/{orderId}/items")] //api/orders/orderId/items
        public async Task<IActionResult> AddOrderItem(int orderId, OrderItemDto item)
        {
            return HandleResult(await _orderService.AddOrderItem(orderId, item));
        }

        [HttpDelete("orders/{orderId}/items/{productId}")] //api/orders/orderId/items/productId
        public async Task<IActionResult> RemoveOrderItem(int orderId, int productId)
        {
            return HandleResult(await _orderService.RemoveOrderItem(orderId, productId));
        }

        [HttpPatch("orders/{orderId}/items")] //api/orders/orderId/items
        public async Task<IActionResult> ChangeOrderItemQuantity(int orderId, OrderItemNewQuantityDto item)
        {
            return HandleResult(await _orderService.ChangeOrderItemQuantity(orderId, item));
        }

        [HttpPatch("orders/{orderId}/status")] //api/orders/orderId/status
        public async Task<IActionResult> ChangeOrderStatus(int orderId, OrderStatus status)
        {
            return HandleResult(await _orderService.ChangeOrderStatus(orderId, status));
        }
    }
}