using AutoMapper;
using Business.Dto;
using Domain.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.MappingProfile
{
    public class ProductProfile:Profile
    {
        public ProductProfile()
        {
            CreateMap<Product, PostProductDto>().ReverseMap();
        }
    }
}
