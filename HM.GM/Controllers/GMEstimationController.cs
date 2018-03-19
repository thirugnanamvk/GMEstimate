using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HM.GM.BAL.Model;
using HM.GM.BAL.Processors;

namespace HM.GM.Controllers
{
    [Route("api/[controller]")]
    public class GMEstimationController : Controller
    {
        private readonly IResourceCostProcessor _practiceCostProcessor;

        public GMEstimationController(IResourceCostProcessor practiceCostProcessor)
        {
            _practiceCostProcessor = practiceCostProcessor;
        }

        [HttpGet]
        public List<ResourceCostDetail> Get()
        {
            return _practiceCostProcessor.GetResourceCostDetails();
        }


        [HttpPost]
        public void Post([FromBody]List<ResourceCostDetail> costDetails)
        {
            _practiceCostProcessor.InsertResourceCostDetails(costDetails);
        }
    }
}
