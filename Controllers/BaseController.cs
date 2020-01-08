using Microsoft.AspNetCore.Mvc;
using System;

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
    }
}