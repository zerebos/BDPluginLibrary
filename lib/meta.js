module.exports = (config) => {
    if (config.info) config = config.info;
    const metaString = ["/**"];
    const line = (label, val) => val && metaString.push(` * @${label} ${val}`);
    line("name", config.name);
    line("description", config.description);
    line("version", config.version);
    line("author", config.author ?? config?.authors.map(a => a.name).join(", "));
    line("authorId", config.authorId ?? config?.authors?.[0].id ?? config?.authors?.[0].discord_id);
    line("authorLink", config.authorLink ?? config?.authors?.[0].link);
    line("website", config.website ?? config.github);
    line("source", config.source ?? config.github ?? config.github_raw);
    line("donate", config.donate);
    line("patreon", config.patreon);
    line("invite", config.invite);
    metaString.push(" */");
    metaString.push("");
    return metaString.join("\n");
};