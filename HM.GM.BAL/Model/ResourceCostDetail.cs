
using System;

namespace HM.GM.BAL.Model
{
    public class ResourceCostDetail
    {
        public string Practice { get; set; }

        public string Skill { get; set; }

        public string Competency { get; set; }

        public float OnsiteCost { get; set; }

        public float OffsiteCost { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public string CreatedBy { get; set; }

        public bool IsActive { get; set; } = true;

    }
}
