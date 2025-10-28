import type { Schema, Struct } from '@strapi/strapi';

export interface FormFormField extends Struct.ComponentSchema {
  collectionName: 'components_form_form_fields';
  info: {
    displayName: 'FormField';
    icon: 'bulletList';
  };
  attributes: {
    label: Schema.Attribute.String;
    maxDate: Schema.Attribute.Date;
    maxLength: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    maxValue: Schema.Attribute.Integer;
    minDate: Schema.Attribute.Date;
    minLength: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    minValue: Schema.Attribute.Integer;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    options: Schema.Attribute.JSON;
    pattern: Schema.Attribute.String;
    required: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    type: Schema.Attribute.Enumeration<
      ['text', 'email', 'password', 'select', 'date', 'number']
    > &
      Schema.Attribute.DefaultTo<'text'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'form.form-field': FormFormField;
    }
  }
}
