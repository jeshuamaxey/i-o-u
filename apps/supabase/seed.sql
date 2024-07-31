DO $$ 
  DECLARE admin_user_email CONSTANT text DEFAULT 'admin@bletchleypark.org';
  DECLARE test_user_email CONSTANT text DEFAULT 'alan@bletchleypark.org';

BEGIN

-- USERS
INSERT INTO auth.users (instance_id,id,aud,"role",email,encrypted_password,email_confirmed_at,last_sign_in_at,raw_app_meta_data,raw_user_meta_data,is_super_admin,created_at,updated_at,phone,phone_confirmed_at,confirmation_token,email_change,email_change_token_new,recovery_token) VALUES
	('00000000-0000-0000-0000-000000000000'::uuid,'b431c59f-8a5a-4b7c-9a67-a564035adb8b'::uuid,'authenticated','authenticated', admin_user_email ,'$2a$10$PznXR5VSgzjnAp7T/X7PCu6vtlgzdFt1zIr41IqP0CmVHQtShiXxS','2022-02-11 21:02:04.547','2022-02-11 22:53:12.520','{"provider": "email", "providers": ["email"]}','{}',FALSE,'2022-02-11 21:02:04.542','2022-02-11 21:02:04.542',NULL,NULL,'','','','');
INSERT INTO auth.identities (id,user_id,identity_data,provider,last_sign_in_at,created_at,updated_at) VALUES
	('b431c59f-8a5a-4b7c-9a67-a564035adb8b','b431c59f-8a5a-4b7c-9a67-a564035adb8b'::uuid,'{"sub": "b431c59f-8a5a-4b7c-9a67-a564035adb8b"}','email','2022-02-11 21:02:04.545','2022-02-11 21:02:04.545','2022-02-11 21:02:04.545');

insert into profiles (id, user_id, username, avatar_url, created_at, updated_at) values
  ('b431c59f-8a5a-4b7c-9a67-a564035adb8b'::uuid, 'b431c59f-8a5a-4b7c-9a67-a564035adb8b'::uuid, 'Admin Man', null, '2022-02-11 21:02:04.542', '2022-02-11 21:02:04.542');

-- GROUPS
insert into groups (id, name, owner_id, currency, archived_at) values
  ('f7b3b3b4-0b3b-4b3b-aaaa-000000000000'::uuid, 'Scotts Initiation', 'b431c59f-8a5a-4b7c-9a67-a564035adb8b'::uuid, 'GBP', null),
  ('f7b3b3b4-0b3b-4b3b-aaaa-000000000001'::uuid, 'Archived Group', 'b431c59f-8a5a-4b7c-9a67-a564035adb8b'::uuid, 'GBP', '2024-07-16');

insert into group_members (group_id, user_id) values
  ('f7b3b3b4-0b3b-4b3b-aaaa-000000000000'::uuid, 'b431c59f-8a5a-4b7c-9a67-a564035adb8b');

-- EXPENSES
insert into expenses (id, group_id, amount, description, date, paid_for_by, split_between) values
  ('f7b3b3b4-0b3b-4b3b-bbbb-000000000001'::uuid, 'f7b3b3b4-0b3b-4b3b-aaaa-000000000000'::uuid, 15, 'Uni', '2024-07-16', 'b431c59f-8a5a-4b7c-9a67-a564035adb8b', '[]'::jsonb),
  ('f7b3b3b4-0b3b-4b3b-bbbb-000000000002'::uuid, 'f7b3b3b4-0b3b-4b3b-aaaa-000000000000'::uuid, 45, 'Taxi', '2024-07-16', 'b431c59f-8a5a-4b7c-9a67-a564035adb8b', '[]'::jsonb),
  ('f7b3b3b4-0b3b-4b3b-bbbb-000000000003'::uuid, 'f7b3b3b4-0b3b-4b3b-aaaa-000000000000'::uuid, 100, 'Pizza', '2024-07-16', 'b431c59f-8a5a-4b7c-9a67-a564035adb8b', '[]'::jsonb);

-- MUST BE LAST
END $$;