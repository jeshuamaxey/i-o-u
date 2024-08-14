DO $$ 
  DECLARE admin_user_email CONSTANT text DEFAULT 'jesh@si.org';
  DECLARE test1_user_email CONSTANT text DEFAULT 'alan@si.org';
  DECLARE test2_user_email CONSTANT text DEFAULT 'scott@si.org';
  DECLARE test3_user_email CONSTANT text DEFAULT 'gio@si.org';

BEGIN

-- USERS
INSERT INTO auth.users (instance_id,id,aud,"role",email,encrypted_password,email_confirmed_at,last_sign_in_at,raw_app_meta_data,raw_user_meta_data,is_super_admin,created_at,updated_at,phone,phone_confirmed_at,confirmation_token,email_change,email_change_token_new,recovery_token) VALUES
	('00000000-0000-0000-0000-000000000000'::uuid,'f7b3b3b4-0b3b-4b3b-ffff-000000000000'::uuid,'authenticated','authenticated', admin_user_email ,'$2a$10$PznXR5VSgzjnAp7T/X7PCu6vtlgzdFt1zIr41IqP0CmVHQtShiXxS','2022-02-11 21:02:04.547','2022-02-11 22:53:12.520','{"provider": "email", "providers": ["email"]}','{}',FALSE,'2022-02-11 21:02:04.542','2022-02-11 21:02:04.542',NULL,NULL,'','','','');
INSERT INTO auth.identities (id,user_id,identity_data,provider,last_sign_in_at,created_at,updated_at) VALUES
	('f7b3b3b4-0b3b-4b3b-ffff-000000000000','f7b3b3b4-0b3b-4b3b-ffff-000000000000'::uuid,'{"sub": "f7b3b3b4-0b3b-4b3b-ffff-000000000000"}','email','2022-02-11 21:02:04.545','2022-02-11 21:02:04.545','2022-02-11 21:02:04.545');

INSERT INTO auth.users (instance_id,id,aud,"role",email,encrypted_password,email_confirmed_at,last_sign_in_at,raw_app_meta_data,raw_user_meta_data,is_super_admin,created_at,updated_at,phone,phone_confirmed_at,confirmation_token,email_change,email_change_token_new,recovery_token) VALUES
	('00000000-0000-0000-0000-000000000001'::uuid,'f7b3b3b4-0b3b-4b3b-ffff-000000000001'::uuid,'authenticated','authenticated', test1_user_email ,'$2a$10$PznXR5VSgzjnAp7T/X7PCu6vtlgzdFt1zIr41IqP0CmVHQtShiXxS','2022-02-11 21:02:04.547','2022-02-11 22:53:12.520','{"provider": "email", "providers": ["email"]}','{}',FALSE,'2022-02-11 21:02:04.542','2022-02-11 21:02:04.542',NULL,NULL,'','','','');
INSERT INTO auth.identities (id,user_id,identity_data,provider,last_sign_in_at,created_at,updated_at) VALUES
	('f7b3b3b4-0b3b-4b3b-ffff-000000000001','f7b3b3b4-0b3b-4b3b-ffff-000000000001'::uuid,'{"sub": "f7b3b3b4-0b3b-4b3b-ffff-000000000001"}','email','2022-02-11 21:02:04.545','2022-02-11 21:02:04.545','2022-02-11 21:02:04.545');

INSERT INTO auth.users (instance_id,id,aud,"role",email,encrypted_password,email_confirmed_at,last_sign_in_at,raw_app_meta_data,raw_user_meta_data,is_super_admin,created_at,updated_at,phone,phone_confirmed_at,confirmation_token,email_change,email_change_token_new,recovery_token) VALUES
	('00000000-0000-0000-0000-000000000002'::uuid,'f7b3b3b4-0b3b-4b3b-ffff-000000000002'::uuid,'authenticated','authenticated', test2_user_email ,'$2a$10$PznXR5VSgzjnAp7T/X7PCu6vtlgzdFt1zIr41IqP0CmVHQtShiXxS','2022-02-11 21:02:04.547','2022-02-11 22:53:12.520','{"provider": "email", "providers": ["email"]}','{}',FALSE,'2022-02-11 21:02:04.542','2022-02-11 21:02:04.542',NULL,NULL,'','','','');
INSERT INTO auth.identities (id,user_id,identity_data,provider,last_sign_in_at,created_at,updated_at) VALUES
	('f7b3b3b4-0b3b-4b3b-ffff-000000000002','f7b3b3b4-0b3b-4b3b-ffff-000000000002'::uuid,'{"sub": "f7b3b3b4-0b3b-4b3b-ffff-000000000002"}','email','2022-02-11 21:02:04.545','2022-02-11 21:02:04.545','2022-02-11 21:02:04.545');

INSERT INTO auth.users (instance_id,id,aud,"role",email,encrypted_password,email_confirmed_at,last_sign_in_at,raw_app_meta_data,raw_user_meta_data,is_super_admin,created_at,updated_at,phone,phone_confirmed_at,confirmation_token,email_change,email_change_token_new,recovery_token) VALUES
	('00000000-0000-0000-0000-000000000003'::uuid,'f7b3b3b4-0b3b-4b3b-ffff-000000000003'::uuid,'authenticated','authenticated', test3_user_email ,'$2a$10$PznXR5VSgzjnAp7T/X7PCu6vtlgzdFt1zIr41IqP0CmVHQtShiXxS','2022-02-11 21:02:04.547','2022-02-11 22:53:12.520','{"provider": "email", "providers": ["email"]}','{}',FALSE,'2022-02-11 21:02:04.542','2022-02-11 21:02:04.542',NULL,NULL,'','','','');
INSERT INTO auth.identities (id,user_id,identity_data,provider,last_sign_in_at,created_at,updated_at) VALUES
	('f7b3b3b4-0b3b-4b3b-ffff-000000000003','f7b3b3b4-0b3b-4b3b-ffff-000000000003'::uuid,'{"sub": "f7b3b3b4-0b3b-4b3b-ffff-000000000003"}','email','2022-02-11 21:02:04.545','2022-02-11 21:02:04.545','2022-02-11 21:02:04.545');

insert into profiles (id, user_id, username, avatar_url, created_at, updated_at) values
  ('f7b3b3b4-0b3b-4b3b-ffff-000000000000'::uuid, 'f7b3b3b4-0b3b-4b3b-ffff-000000000000'::uuid, 'Jesh', null, '2022-02-11 21:02:04.542', '2022-02-11 21:02:04.542'),
  ('f7b3b3b4-0b3b-4b3b-ffff-000000000001'::uuid, 'f7b3b3b4-0b3b-4b3b-ffff-000000000001'::uuid, 'Alan', null, '2022-02-11 21:02:04.542', '2022-02-11 21:02:04.542'),
  ('f7b3b3b4-0b3b-4b3b-ffff-000000000002'::uuid, 'f7b3b3b4-0b3b-4b3b-ffff-000000000002'::uuid, 'Scott', null, '2022-02-11 21:02:04.542', '2022-02-11 21:02:04.542'),
  ('f7b3b3b4-0b3b-4b3b-ffff-000000000003'::uuid, 'f7b3b3b4-0b3b-4b3b-ffff-000000000003'::uuid, 'Gio', null, '2022-02-11 21:02:04.542', '2022-02-11 21:02:04.542');

-- GROUPS
insert into groups (id, name, owner_id, currency, archived_at) values
  ('f7b3b3b4-0b3b-4b3b-aaaa-000000000000'::uuid, 'Scotts Initiation', 'f7b3b3b4-0b3b-4b3b-ffff-000000000000'::uuid, 'GBP', null),
  ('f7b3b3b4-0b3b-4b3b-aaaa-000000000001'::uuid, 'Archived Group', 'f7b3b3b4-0b3b-4b3b-ffff-000000000000'::uuid, 'GBP', '2024-07-16');

insert into group_members (id, group_id, user_id, name) values
  -- SI group
  ('f7b3b3b4-0b3b-4b3b-bbbb-000000000000'::uuid, 'f7b3b3b4-0b3b-4b3b-aaaa-000000000000'::uuid, 'f7b3b3b4-0b3b-4b3b-ffff-000000000000', 'jesh'),
  ('f7b3b3b4-0b3b-4b3b-bbbb-000000000001'::uuid, 'f7b3b3b4-0b3b-4b3b-aaaa-000000000000'::uuid, 'f7b3b3b4-0b3b-4b3b-ffff-000000000001', 'alan'),
  ('f7b3b3b4-0b3b-4b3b-bbbb-000000000002'::uuid, 'f7b3b3b4-0b3b-4b3b-aaaa-000000000000'::uuid, 'f7b3b3b4-0b3b-4b3b-ffff-000000000002', 'scott'),
  ('f7b3b3b4-0b3b-4b3b-bbbb-000000000003'::uuid, 'f7b3b3b4-0b3b-4b3b-aaaa-000000000000'::uuid, 'f7b3b3b4-0b3b-4b3b-ffff-000000000003', 'gio'),
  ('f7b3b3b4-0b3b-4b3b-bbbb-000000000004'::uuid, 'f7b3b3b4-0b3b-4b3b-aaaa-000000000000'::uuid, null, 'duncan'),
  -- Archived group
  ('f7b3b3b4-0b3b-4b3b-bbbb-000000000100'::uuid, 'f7b3b3b4-0b3b-4b3b-aaaa-000000000001'::uuid, 'f7b3b3b4-0b3b-4b3b-ffff-000000000000', 'jesh'),
  ('f7b3b3b4-0b3b-4b3b-bbbb-000000000101'::uuid, 'f7b3b3b4-0b3b-4b3b-aaaa-000000000001'::uuid, 'f7b3b3b4-0b3b-4b3b-ffff-000000000003', 'gio');

-- EXPENSES
insert into expenses (id, group_id, created_by, amount, description, date, paid_for_by, split_between) values
  -- SI group
  ('f7b3b3b4-0b3b-4b3b-bbbb-000000000001'::uuid, 'f7b3b3b4-0b3b-4b3b-aaaa-000000000000'::uuid, 'f7b3b3b4-0b3b-4b3b-ffff-000000000000'::uuid, 15, 'Uni', '2024-07-16', 'f7b3b3b4-0b3b-4b3b-bbbb-000000000000', '[{
    "beneficiary": "f7b3b3b4-0b3b-4b3b-bbbb-000000000000",
    "amount": 7.50
  }, {
    "beneficiary": "f7b3b3b4-0b3b-4b3b-bbbb-000000000001",
    "amount": 7.50
  }]'::jsonb),
  ('f7b3b3b4-0b3b-4b3b-bbbb-000000000002'::uuid, 'f7b3b3b4-0b3b-4b3b-aaaa-000000000000'::uuid, 'f7b3b3b4-0b3b-4b3b-ffff-000000000000'::uuid, 45, 'Taxi', '2024-07-16', 'f7b3b3b4-0b3b-4b3b-bbbb-000000000000', '[{
    "beneficiary": "f7b3b3b4-0b3b-4b3b-bbbb-000000000000",
    "amount": 10.00
  }, {
    "beneficiary": "f7b3b3b4-0b3b-4b3b-bbbb-000000000001",
    "amount": 35.00
  }]'::jsonb),
  ('f7b3b3b4-0b3b-4b3b-bbbb-000000000003'::uuid, 'f7b3b3b4-0b3b-4b3b-aaaa-000000000000'::uuid, 'f7b3b3b4-0b3b-4b3b-ffff-000000000000'::uuid, 20, 'OJ', '2024-07-16', 'f7b3b3b4-0b3b-4b3b-bbbb-000000000000', '[{
    "beneficiary": "f7b3b3b4-0b3b-4b3b-bbbb-000000000000",
    "amount": 5.00
  }, {
    "beneficiary": "f7b3b3b4-0b3b-4b3b-bbbb-000000000001",
    "amount": 5.00
  }, {
    "beneficiary": "f7b3b3b4-0b3b-4b3b-bbbb-000000000002",
    "amount": 5.00
  }, {
    "beneficiary": "f7b3b3b4-0b3b-4b3b-bbbb-000000000003",
    "amount": 5.00
  }]'::jsonb),
  ('f7b3b3b4-0b3b-4b3b-bbbb-000000000004'::uuid, 'f7b3b3b4-0b3b-4b3b-aaaa-000000000000'::uuid, 'f7b3b3b4-0b3b-4b3b-ffff-000000000003'::uuid, 300, 'Glitter paint', '2024-07-16', 'f7b3b3b4-0b3b-4b3b-bbbb-000000000003', '[{
    "beneficiary": "f7b3b3b4-0b3b-4b3b-bbbb-000000000000",
    "amount": 100.00
  }, {
    "beneficiary": "f7b3b3b4-0b3b-4b3b-bbbb-000000000001",
    "amount": 100.00
  }, {
    "beneficiary": "f7b3b3b4-0b3b-4b3b-bbbb-000000000002",
    "amount": 100.00
  }]'::jsonb),
  -- Archived group
  ('f7b3b3b4-0b3b-4b3b-bbbb-000000000100'::uuid, 'f7b3b3b4-0b3b-4b3b-aaaa-000000000001'::uuid, 'f7b3b3b4-0b3b-4b3b-ffff-000000000000'::uuid, 100, 'Pizza', '2024-07-16', 'f7b3b3b4-0b3b-4b3b-bbbb-000000000100', '[{
    "beneficiary": "f7b3b3b4-0b3b-4b3b-bbbb-000000000100",
    "amount": 10.00
  }, {
    "beneficiary": "f7b3b3b4-0b3b-4b3b-bbbb-000000000101",
    "amount": 90.00
  }]'::jsonb);

-- PAYMENTS
insert into payments (group_id, created_by, date, amount, paid_from, paid_to) values
  ('f7b3b3b4-0b3b-4b3b-aaaa-000000000000'::uuid, 'f7b3b3b4-0b3b-4b3b-ffff-000000000000'::uuid, '2024-07-20', 105, 'f7b3b3b4-0b3b-4b3b-bbbb-000000000002'::uuid, 'f7b3b3b4-0b3b-4b3b-bbbb-000000000003'::uuid);

-- MUST BE LAST
END $$;

