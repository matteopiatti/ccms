import knex from "knex";

const base = knex({
  client: "better-sqlite3",
  connection: {
    filename: "database.sqlite",
  },
});

const migrate = async () => {
  if (!(await base.schema.hasTable("pages"))) {
    await base.schema.createTable("pages", (table) => {
      table.increments("id").primary();
      table.text("content");
      table.text("slug").unique();
      table.text("title");
    });
  }

  if (!(await base.schema.hasTable("components"))) {
    await base.schema.createTable("components", (table) => {
      table.increments("id").primary();
      table.text("name");
      table.text("url");
      table.json("props_schema");
    });
  }

  if (!(await base.schema.hasTable("page_components"))) {
    await base.schema.createTable("page_components", (table) => {
      table.increments("id").primary();
      table.integer("page_id").references("pages.id");
      table.integer("component_id").references("components.id");
      table
        .integer("parent_component_id")
        .references("page_components.id")
        .onDelete("CASCADE");
      table.json("props");
      table.integer("order");
    });
  }
};

export { base, migrate };
