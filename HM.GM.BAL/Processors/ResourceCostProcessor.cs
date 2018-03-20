using System.Collections.Generic;
using BALModel = HM.GM.BAL.Model;
using AutoMapper;
using DALModel = HM.GM.DAL.Model;
using HM.GM.DAL.Repository;

namespace HM.GM.BAL.Processors
{
    public class ResourceCostProcessor : IResourceCostProcessor
    {
        private IResourceCostRepository _resourceCostRepository;

        public ResourceCostProcessor(IResourceCostRepository resourceCostRepository)
        {
            _resourceCostRepository = resourceCostRepository;
        }

        public List<BALModel.ResourceCostDetail> GetResourceCostDetails()
        {
            var resourceCostDetils = _resourceCostRepository.GetResourceCostDetails();
            return Mapper.Map<List<BALModel.ResourceCostDetail>>(resourceCostDetils);
        }

        public void InsertResourceCostDetails(List<BALModel.ResourceCostDetail> resourceCostDetailList)
        {
            var dalModel = Mapper.Map<List<DALModel.ResourceCostDetail>>(resourceCostDetailList);
            _resourceCostRepository.InsertResourceCostDetails(dalModel);
        }

        public BALModel.GMDefaults GetGMDefaults()
        {
            var gMDefaultsDAL = _resourceCostRepository.GetGMDefaults();
            return Mapper.Map<BALModel.GMDefaults>(gMDefaultsDAL);
        }
    }
}
