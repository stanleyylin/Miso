from discord.ext import commands
import discord 

class Commands(commands.Cog):

    def __init__(self, client):
        self.client = client
    
    @commands.command()
    async def mid(self, context):

        uid = context.message.author.id
        current_user_name  = context.message.author

        await(context.send(f"hey <@{uid}, your uinque id is **{uid}**"))