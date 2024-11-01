import { jargon_query } from './src/supabase';

async function main() {
    const { data: terms, error } = await jargon_query('hacker');
    if (error) {
        console.error(error.message);
    } else {
        terms.forEach(term => {
            console.log(`Hacker (n.)\n${term.def}`);
        });
    }
}

main();
