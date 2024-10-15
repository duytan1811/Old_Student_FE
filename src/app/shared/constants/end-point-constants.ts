export const EndPointConstants = {
  Dashboard: {
    Index: `dashboard`,
  },
  Dropdown: {
    Major: `dropdowns/majors`,
    User: `dropdowns/users`,
    Role: `dropdowns/roles`,
    NewsType: `dropdowns/news-types`,
    Events: `dropdowns/events`,
  },
  Role: {
    Index: `roles`,
  },
  Setting: {
    Index: `settings`,
  },
  Major: {
    Index: `majors`,
  },
  User: {
    Index: `users`,
  },
  Student: {
    Index: `students`,
  },
  StudentAchievement: {
    Index: `student-achievements`,
  },
  Auth: {
    Login: `login`,
    Register: `register`,
  },
  News: {
    Index: `news`,
    Like: `news/:id/like`,
    Comment: `news/:id/comments`,
    Confirm: `news/:id/confirm`,
  },
  Forum: {
    Index: `forums`,
    Search: `forums/search`,
  },
  Job: {
    Index: `jobs`,
    Search: `jobs/search`,
    ApplyJob: `jobs/:id/apply-job`,
  },
  Event:{
    Index:'events',
    UserRegister:'events/:id/user-registers',
    Register:'events/:id/registers',
    ExportExcel:'events/export-excel',
  },
  Statistics:{
    Index:'statistics',
    EventByMonth:'statistics/event-by-month'
  }
};
