using System;
using System.Collections.Generic;
using System.Text;

namespace HM.GM.DAL.Model
{
    public class SaveResourceCostDetail
    {
        public List<ResourceCostDetail> UpdateResourceCostDetail { get; set; }
        public List<ResourceCostDetail> InsertResourceCostDetail { get; set; }
        public List<ResourceCostDetail> DeleteResourceCostDetail { get; set; }
    }
}
