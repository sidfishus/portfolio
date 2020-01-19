using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace react_spa.Controllers
{
    [ApiController]
    public class BaseController : Microsoft.AspNetCore.Mvc.ControllerBase
    {
        public ActionResult<T> ControllerFunction<T>(Func<ActionResult<T>> func)
        {
            try
            {
                return func();
            }
            catch (Exception exception)
			{
				return StatusCode(500,exception.ToString());
			}
        }

        public async Task<ActionResult<T>> ControllerFunctionAsync<T>(Func<Task<ActionResult<T>>> func)
        {
            try
            {
                return await func();
            }
            catch (Exception exception)
			{
                var msg=exception.ToString();
				return StatusCode(500,msg);
			}
        }
    }
}