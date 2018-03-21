using System.Collections.Generic;
using BALModel = HM.GM.BAL.Model;
using AutoMapper;
using DALModel = HM.GM.DAL.Model;
using HM.GM.DAL.Repository;
using System;

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
            var resourceCostDetils = _resourceCostRepository.GetResourceDetails();
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

        public List<BALModel.GMCalculationParams> CalculateGM(List<BALModel.GMCalculationParams> gmCalculationParamsList)
        {
            var gmDefaults = _resourceCostRepository.GetGMDefaults();

            foreach (var param in gmCalculationParamsList)
            {
                var monthlyRate = param.RatePerHour * gmDefaults.DaysPerMonth * gmDefaults.HoursPerDay;
                var costDetails = _resourceCostRepository.GetCostForResource(param.Location, param.Practice, param.Skill, param.Competency);
                var costPerHour = param.Location.Equals("ONSITE", StringComparison.InvariantCultureIgnoreCase) ? costDetails.OnsiteCost : costDetails.OffsiteCost;
                var costPerMonth = costPerHour * gmDefaults.DaysPerMonth * gmDefaults.HoursPerDay;
                var monthsActualLoading = (param.WeeksActualLoading * gmDefaults.DaysPerWeek / gmDefaults.DaysPerMonth);
                var weeksWithContengency = param.WeeksActualLoading + (param.WeeksActualLoading * (gmDefaults.Contengency / 100));
                param.MonthLoadingWithContengency = (param.WeeksActualLoading * gmDefaults.DaysPerWeek / gmDefaults.DaysPerMonth) + (param.WeeksActualLoading * gmDefaults.DaysPerWeek / gmDefaults.DaysPerMonth) * (gmDefaults.Contengency / 100);
                param.TotalBilling = (param.MonthLoadingWithContengency * monthlyRate) + param.OnsitePerdim;
                var totalCost = (costPerMonth * param.MonthLoadingWithContengency) + param.OnsiteCost;
                param.TotalGMInPercentage = ((param.TotalBilling - totalCost) / param.TotalBilling) * 100;
            }
            return gmCalculationParamsList;
        }
    }
}
