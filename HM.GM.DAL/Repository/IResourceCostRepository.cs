using HM.GM.DAL.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace HM.GM.DAL.Repository
{
    public interface IResourceCostRepository
    {
        void InsertResourceCostDetails(List<ResourceCostDetail> practiceCostDetailList);

        List<ResourceCostDetail> GetResourceCostDetails();
    }
}
