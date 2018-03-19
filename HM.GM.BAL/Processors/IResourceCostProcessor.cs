using HM.GM.BAL.Model;
using System.Collections.Generic;

namespace HM.GM.BAL.Processors
{
    public interface IResourceCostProcessor
    {
        void InsertResourceCostDetails(List<ResourceCostDetail> practiceCostDetailList);

        List<ResourceCostDetail> GetResourceCostDetails();
    }
}
