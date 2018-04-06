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
        public List<ResourceCostDetail> GetGMDefaults()
        {
            return _resourceCostProcessor.GetResourceCostDetails();
        }

        [HttpPost]
        public void Post([FromBody]List<ResourceCostDetail> costDetails)
        {
            if (costDetails != null)
                _resourceCostProcessor.InsertResourceCostDetails(costDetails);
           
        }

        [HttpPost]
        [Route("calculateGM")]
        public GMInput CalculateGM([FromBody]GMInput gmInput)
        {
            return _resourceCostProcessor.CalculateGM(gmInput);
        }

        [HttpGet]
        [Route("GetCompetencyMatrix")]
        public string GetCompetencyMatrix()
        {
            return _resourceCostProcessor.GetCompetencyMatrix();
        }

        [HttpPost]
        [Route("getUserAccess")]
        public UserAccess GetUserAccess([FromBody] UserAccess user)
        {
            return _resourceCostProcessor.GetUserAccess(user.UserName);
        }




       
        [HttpPost]
        [Route("SaveResourceCostChanges")]
        public void SaveResourceCostChanges([FromBody] SaveResourceCostDetail saveResourceCostDetail)
        {
            _resourceCostProcessor.SaveChangesResourceCostDetail(saveResourceCostDetail);
           
        }

    }
}
