using DTOLibrary;
using ModelLibrary;

namespace APIs.Adaptors
{
    public interface IProductAdaptor
    {
        Product convertDTOtoProduct(ProductDTO product);
        List<ProductDTO> convertListProducttoDTO(List<Product> products);
        List<Product> convertListProducttoDTO(List<ProductDTO> productsDTO);
        ProductDTO convertProductToDTO(Product product);
    }
}