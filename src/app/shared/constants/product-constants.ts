export class ProductConstants{
  public static readonly ATTRIBUTES = [
    { value: 'productName', text: 'Tên sản phẩm' },
    { value: 'supplier', text: 'Nhà cung cấp' },
    { value: 'price', text: 'Giá sản phẩm' },
    { value: 'tag', text: 'Tag sản phẩm' },
    { value: 'inventory', text: 'Tồn kho' },
  ]

  public static readonly PROPERTIES = [
    { value: 'scale', text: 'Kích thước' },
    { value: 'color', text: 'Màu sắc' },
    { value: 'material', text: 'Vật liệu' },
    { value: 'title', text: 'Tiêu đề' },
    { value: 'design', text: 'Kiểu dáng' },
  ]

  public static readonly TABS = [
    { value: 'information', text: 'Thông tin' },
    { value: 'detail', text: 'Mô tả chi tiết' },
    { value: 'component', text: 'Thành phần' },
    { value: 'extra-dish', text: 'Món thêm' },
    { value: 'offshoot', text: 'Chi nhánh' },
  ]
}