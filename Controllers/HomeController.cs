using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using react_spa.Models;

namespace react_spa.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View("../SPA");
        }
    }
}
