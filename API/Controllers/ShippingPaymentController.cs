using Application.Dto.ShippingPayment;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ShippingPaymentController : BaseApiController
    {
        private readonly IShippingPaymentService _shippingPaymentService;

        public ShippingPaymentController(IShippingPaymentService shippingPaymentService)
        {
            _shippingPaymentService = shippingPaymentService;
        }

        [HttpGet("shipping-methods")] //api/shipping-methods
        public async Task<IActionResult> GetShippingMethods()
        {
            return HandleResult(await _shippingPaymentService.GetShippingMethods());
        }

        [HttpGet("payment-methods")] //api/payment-methods
        public async Task<IActionResult> GetPaymentMethods()
        {
            return HandleResult(await _shippingPaymentService.GetPaymentMethods());
        }

        [HttpPost("shipping-methods")] //api/shipping-methods
        public async Task<IActionResult> AddShippingMethod(ShippingMethodCreateUpdateDto method)
        {
            return HandleResult(await _shippingPaymentService.AddShippingMethod(method));
        }

        [HttpPost("payment-methods")] //api/payment-methods
        public async Task<IActionResult> AddPaymentMethod(PaymentMethodCreateUpdateDto method)
        {
            return HandleResult(await _shippingPaymentService.AddPaymentMethod(method));
        }

        [HttpPut("shipping-methods/{methodId}")] //api/shipping-methods/methodId
        public async Task<IActionResult> UpdateShippingMethod(int methodId, ShippingMethodCreateUpdateDto method)
        {
            return HandleResult(await _shippingPaymentService.UpdateShippingMethod(methodId, method));
        }

        [HttpPut("payment-methods/{methodId}")] //api/payment-methods/methodId
        public async Task<IActionResult> UpdatePaymentMethod(int methodId, PaymentMethodCreateUpdateDto method)
        {
            return HandleResult(await _shippingPaymentService.UpdatePaymentMethod(methodId, method));
        }

        [HttpDelete("shipping-methods/{methodId}")] //api/shipping-methods/methodId
        public async Task<IActionResult> DeleteShippingMethod(int methodId)
        {
            return HandleResult(await _shippingPaymentService.DeleteShippingMethod(methodId));
        }

        [HttpDelete("payment-methods/{methodId}")]  //api/payment-methods/methodId
        public async Task<IActionResult> DeletePaymentMethod(int methodId)
        {
            return HandleResult(await _shippingPaymentService.DeletePaymentMethod(methodId));
        }
    }
}