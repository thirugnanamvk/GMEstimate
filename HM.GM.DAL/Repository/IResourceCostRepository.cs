using HM.GM.DAL.Model;
using System.Collections.Generic;

namespace HM.GM.DAL.Repository
{
    public interface IResourceCostRepository
    {
        void InsertResourceCostDetails(List<ResourceCostDetail> resourceCostDetailList);

        List<ResourceCostDetail> GetResourceCostDetails();
    }
}
