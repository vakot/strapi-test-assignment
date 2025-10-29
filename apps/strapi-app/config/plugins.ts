export default () => ({
  'users-permissions': {
    config: {
      register: {
        allowedFields: [
          'first_name',
          'last_name',
          'confirm_password',
          'country',
          'phone',
          'zip',
          'birthday',
        ],
      },
    },
  },
})
