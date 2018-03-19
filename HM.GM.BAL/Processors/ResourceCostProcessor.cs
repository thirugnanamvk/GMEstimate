using System.Collections.Generic;
using BALModel = HM.GM.BAL.Model;
using AutoMapper;
using DALModel = HM.GM.DAL.Model;
using HM.GM.DAL.Repository;

namespace HM.GM.BAL.Processors
{
    public class ResourceCostProcessor : IResourceCostProcessor
    {
        private IResourceCostRepository _practiceCostRepository;
        public ResourceCostProcessor(IResourceCostRepository practiceCostRepository)
        {
            _practiceCostRepository = practiceCostRepository;
        }

        public List<BALModel.ResourceCostDetail> GetResourceCostDetails()
        {
            var practiceCostDetils = _practiceCostRepository.GetResourceCostDetails();
            return Mapper.Map<List<BALModel.ResourceCostDetail>>(practiceCostDetils);
        }

        public void InsertResourceCostDetails(List<BALModel.ResourceCostDetail> practiceCostDetailList)
        {
            var dalModel = Mapper.Map<List<DALModel.ResourceCostDetail>>(practiceCostDetailList);
            _practiceCostRepository.InsertResourceCostDetails(dalModel);
        }
    }
}
