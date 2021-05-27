using AnnotationTool.Models;
using AnnotationTool.Models.ViewModels;
using AnnotationTool.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace AnnotationTool.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult LabelStudio()
        {
            return View();
        }
        [Route("/")]
        public IActionResult UniversalDataTool()
        {
            PostgreSqlRepository postgreSqlRepository = new PostgreSqlRepository();
            List<UdtInterfaceModel> udtInterfaces = postgreSqlRepository.GetInterfaces();
            UniversalDataToolViewModel udtVM = new UniversalDataToolViewModel(udtInterfaces);

            return View(udtVM);
        }        

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
