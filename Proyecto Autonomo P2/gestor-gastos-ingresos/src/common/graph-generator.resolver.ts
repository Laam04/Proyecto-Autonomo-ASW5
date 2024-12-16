import { Resolver, Mutation } from '@nestjs/graphql';
import { GraphGeneratorService } from './graph-generator.service';

@Resolver()
export class GraphGeneratorResolver {
  constructor(private readonly graphGeneratorService: GraphGeneratorService) {}

  @Mutation(() => String)
  async generateGraph(): Promise<string> {
    const graphImageBuffer = await this.graphGeneratorService.generateGraph();
    return graphImageBuffer.toString();
  }
}
