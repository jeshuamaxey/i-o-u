import { QueryData } from '@supabase/supabase-js'
import { createClient } from '../supabase/client'
import { GROUP_SELECT } from './_queries'

const supabase = createClient()

const groupQuery = supabase.from('groups').select(GROUP_SELECT).single()
export type SBGroup = QueryData<typeof groupQuery>
