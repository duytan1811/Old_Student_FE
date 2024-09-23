import { StatusEnum } from '../enum/status.enum';

export class CommonConstants {
  public static readonly ResponseType = {
    Success: 'success',
    Error: 'error',
  };

  public static readonly FormStatuses = [
    { value: '', text: 'Chọn trạng thái' },
    { value: StatusEnum.Active, text: 'Hoạt động' },
    { value: StatusEnum.Inactive, text: 'Không hoạt động' },
  ];

  public static readonly SearchStatus = [
    { value: '', text: 'Tất cả' },
    { value: StatusEnum.Active, text: 'Hoạt động' },
    { value: StatusEnum.Inactive, text: 'Không hoạt động' },
  ];

  public static readonly MENU_KEYS = {
    LobbyManager: 'LobbyManager',
    OrderManager: 'OrderManager',
    ProductManager: 'ProductManager',
    AccountManager: 'AccountManager',
    Booking: 'Booking',
    Lobby: 'Lobby',
    Order: 'Order',
    DraftOrder: 'DraftOrder',
    ProductMenuType: 'ProductMenuType',
    Product: 'Product',
    TimeKeeping: 'TimeKeeping',
    WorkShift: 'WorkShift',
    Supplier: 'Supplier',
    Inventory: 'Inventory',
    Customer: 'Customer',
    User: 'User',
    Discount: 'Discount',
    StatisticsProduct: 'StatisticsProduct',
    StatisticsOrder: 'StatisticsOrder',
    StatisticsCustomer: 'StatisticsCustomer',
    Setting: 'Setting',
    Role: 'Role',
    Dashboard: 'Dashboard',
    Checkout: 'Checkout',
    SettingGeneral: 'SettingGeneral',
    DefaultImage: 'DefaultImage',
    Table: 'Table',
  };

  public static readonly PERMISSION = {
    VIEW: 1,
    CREATE: 2,
    EDIT: 3,
    DELETE: 4,
  };
}
