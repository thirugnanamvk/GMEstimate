using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HM.GM.BAL.Model;
using HM.GM.BAL.Processors;
using Microsoft.AspNetCore.Authorization;

namespace HM.GM.Controllers
{
    [Route("api/[controller]")]
    public class GMEstimationController : Controller
    {
        private readonly IResourceCostProcessor _resourceCostProcessor;

        public GMEstimationController(IResourceCostProcessor resourceCostProcessor)
        {
            _resourceCostProcessor = resourceCostProcessor;
        }

        [HttpGet]
        public List<ResourceCostDetail> Get()
        {
            return _resourceCostProcessor.GetResourceCostDetails();
        }

        [HttpGet]
        [Route("GMDefaults")]
        public Dictionary<string, string> GetGMDefaults()
        {
            return _resourceCostProcessor.GetGMDefaults();
        }

        [HttpPost]
        public void Post([FromBody]List<ResourceCostDetail> costDetails)
        {
            _resourceCostProcessor.InsertResourceCostDetails(costDetails);
        }

        [HttpPost]
        [Route("calculateGM")]
        public GMInput CalculateGM([FromBody]GMInput gmInput)
        {
            return _resourceCostProcessor.CalculateGM(gmInput);
        }

        [HttpPost]
        [Route("getUserAccess")]
        public UserAccess GetUserAccess([FromBody] UserAccess user)
        {
            return _resourceCostProcessor.GetUserAccess(user.UserName);
        }

        [HttpGet]
        [Route("GetCompetencyMatrix")]
        public string GetCompetencyMatrix()
        {
            return _resourceCostProcessor.GetCompetencyMatrix();
        }
    }
}
