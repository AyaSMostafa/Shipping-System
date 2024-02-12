using DTOLibrary;
using ModelLibrary;

namespace APIs.Adaptors
{
    public class ProductAdaptor : IProductAdaptor
    {
        public ProductDTO convertProductToDTO(Product product)
        {
            return new ProductDTO()
            {
                Name = product.Name,
                Quantity = product.Quantity,
                Weight = product.Weight
            };
        }

        public Product convertDTOtoProduct(ProductDTO product)
        {
            return new Product()
            {
                Name = product.Name,
                Quantity = product.Quantity,
                Weight = product.Weight
            };
        }

        public List<ProductDTO> convertListProducttoDTO(List<Product> products)
        {
            List<ProductDTO> productDTOs = new List<ProductDTO>();
            foreach (var product in products)
            {
                productDTOs.Add(convertProductToDTO(product));
            }
            return productDTOs;
        }

        public List<Product> convertListProducttoDTO(List<ProductDTO> productsDTO)
        {
            List<Product> products = new List<Product>();
            foreach (var product in productsDTO)
            {
                products.Add(convertDTOtoProduct(product));
            }
            return products;
        }
    }
}
