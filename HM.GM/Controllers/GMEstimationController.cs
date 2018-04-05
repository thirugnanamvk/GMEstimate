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
        public GMDefaults GetGMDefaults()
        {
            return _resourceCostProcessor.GetGMDefaults();
        }

        [HttpPost]
        public bool Post([FromBody]List<ResourceCostDetail> costDetails)
        {
            if (costDetails != null)
                _resourceCostProcessor.InsertResourceCostDetails(costDetails);
            return true;
        }

        [HttpPost]
        [Route("calculateGM")]
        public GMInput CalculateGM([FromBody]GMInput gmInput)
        {
            return _resourceCostProcessor.CalculateGM(gmInput);
        }

        [HttpGet]
        [Route("orgMetadata")]
        public OrganizationMetadata GetOrganizationMetadata()
        {
            return _resourceCostProcessor.GetOrganizationMetadata();
        }

        [HttpPost]
        [Route("getUserAccess")]
        public UserAccess GetUserAccess([FromBody] UserAccess user)
        {
            return _resourceCostProcessor.GetUserAccess(user.UserName);
        }




        [HttpPut]
        [Route("updateResourceCost")]
        public IActionResult UpdateResourceCost([FromBody] List<ResourceCostDetail> costDetails)
        {
            _resourceCostProcessor.DeleteResourceCostDetails(costDetails);
            return new ViewResult();
        }


        [HttpDelete]
        [Route("deleteResourceCost")]
        public IActionResult DeleteResourceCost([FromBody]  List<ResourceCostDetail> costDetails)
        {
            _resourceCostProcessor.UpdateResourceCostDetails(costDetails);
            return new ViewResult();
        }

    }
}
