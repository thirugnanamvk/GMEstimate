using System;
using System.Collections.Generic;
using System.Text;

namespace HM.GM.DAL.Model
{
    public class ResourceGroup
    {
        public List<Practice> Practice { get; set; }
        public List<SKillCompentency> Skills { get; set; }
        public List<SKillCompentency> Compentency { get; set; }
    }

}
