using System;
using System.Collections.Generic;
using System.Text;

namespace HM.GM.DAL.Model
{
    public class UserAccess
    {
        public string UserName { get; set; }

        public int Id { get; set; }

        public bool IsAdmin { get; set; }
    }
}
