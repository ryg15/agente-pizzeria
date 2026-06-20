const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

module.exports = async (req, res) => {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { data: pedidos, error: errorPedidos } = await supabase
      .from("pedidos")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    const { data: leads, error: errorLeads } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    res.status(200).json({
      pedidos: pedidos || [],
      leads: leads || [],
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al obtener datos" });
  }
};
