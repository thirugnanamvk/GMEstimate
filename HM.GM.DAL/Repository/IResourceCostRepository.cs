using HM.GM.DAL.Model;
using System.Collections.Generic;

namespace HM.GM.DAL.Repository
{
    public interface IResourceCostRepository
    {
        void InsertResourceCostDetails(List<ResourceCostDetail> resourceCostDetailList);
       
        void SaveChangesResourceCostDetail(ResourceCostDetailList resourceCostDetail);

        List<ResourceCostDetail> GetResourceDetails();

        Dictionary<string, string> GetGMDefaults();

        ResourceCostDetail GetCostForResource(string location, string practice, string skill, string competency);

        UserAccess GetUserAccess(string username);

        string GetCompetencyMatrix();
    }
}
