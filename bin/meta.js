module.exports = (config) => {
    const metaString = ["/**"];
    const line = (label, val) => val && metaString.push(` * @${label} ${val}`);
    line("name", config.info.name);
    line("description", config.info.description);
    line("version", config.info.version);
    line("author", config.info.authors.map(a => a.name).join(", "));
    line("authorId", config.info.authors[0].id ?? config.info.authors[0].discord_id);
    line("authorLink", config.info.authors[0].link);
    line("website", config.info.website ?? config.info.github);
    line("source", config.info.source ?? config.info.github_raw);
    line("donate", config.info.donate);
    line("patreon", config.info.patreon);
    metaString.push(" */");
    metaString.push("");
    return metaString.join("\n");
};