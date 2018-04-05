using HM.GM.BAL.Model;
using System.Collections.Generic;

namespace HM.GM.BAL.Processors
{
    public interface IResourceCostProcessor
    {
        void InsertResourceCostDetails(List<ResourceCostDetail> resourceCostDetailList);
        void DeleteResourceCostDetails(List<ResourceCostDetail> resourceCostDetailList);
        void UpdateResourceCostDetails(List<ResourceCostDetail> resourceCostDetailList);

        List<ResourceCostDetail> GetResourceCostDetails();

        Dictionary<string, string> GetGMDefaults();

        GMInput CalculateGM(GMInput gMInput);

        UserAccess GetUserAccess(string username);

        string GetCompetencyMatrix();
    }
}
